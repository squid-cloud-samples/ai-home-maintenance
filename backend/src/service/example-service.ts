import { secureDatabase, SquidService, secureAiChatbot, aiFunction, webhook, secureAiAgent, WebhookRequest } from '@squidcloud/backend';
import { Get, Query, Route } from 'tsoa';


export type MaintenanceTask = {
  __id: string;
  task: string;
  interval: string;
  appliance: string;
  lastUpdated?: string;
  completed: boolean;
};

export class ExampleService extends SquidService {


  @secureDatabase('all', 'built_in_db')
  allowAllAccessToBuiltInDb(): boolean {
    return true;
  }

  // Allow anybody to chat with the home-knowledge AI agent
  @secureAiAgent('chat', 'maintenance-scheduler')
  @secureAiChatbot('maintenance-scheduler', 'chat')
  allowAllAccessToChatbot(): boolean {
    return true;
  }

  @webhook('delete')
  async deleteAllDocs(): Promise<void> {
    const docs = await this.squid.collection('tasks').query().snapshot();
    docs.map((doc) => {
      doc.delete();
    });
  }

  @webhook('talkToAgent')
  async talkToAgent(context: WebhookRequest) {
    const prompt = context.queryParams["prompt"];
    const response = await this.squid.ai().agent('maintenance-scheduler').ask(prompt);
    return response;
  }

  @aiFunction(
    'If someone asks for a list of maintenance tasks, run this function. This function creates a maintenance task for a list of tasks. Pass each created task to this function. If the user asks how to complete a specific task, then do not run this function. !Important: if a user asks questions about **existing** tasks in the database, then do not run this function.',
    [
      {
        name: 'task',
        description: 'the task to complete',
        type: 'string',
        required: true,
      },
      {
        name: 'interval',
        description: 'the frequency or interval at which the task needs to be done',
        type: 'string',
        required: true,
      },
      {
        name: 'appliance',
        description:
          'the appliance that requires the given maintenance. Provide the manufacturer name of the appliance, along with the type of appliance',
        type: 'string',
        required: true,
      },
    ],
  )
  async createTaskItem(params: { task: string; interval: string; appliance: string }) {
    const { task, interval, appliance } = params;
    console.log('createTaskItem', task);
    await this.logMaintenanceScheduleInternal({ task, interval, appliance, completed: false });
  }

  private async logMaintenanceScheduleInternal(task: {
    task: string;
    interval: string;
    appliance: string;
    completed: boolean;
    lastUpdated?: string;
  }) {
    // check if item exists in the database
    const existingTask = await this.squid.collection('tasks').query().like('task', task.task, false).snapshot();
    // if it does exist, update "lastUpdated"
    if (existingTask.length > 0) {
      await existingTask[0].update({ lastUpdated: new Date().toDateString() });
    } else {
      // otherwise, add the new task to the database
      task.lastUpdated = new Date().toDateString();
      const doc = this.squid.collection('tasks').doc();
      await doc.insert(task);
    }
  }

  @aiFunction(
    " !Important: Call this function when a client prompt requests information about the **existing** tasks in their database. This function queries the database for tasks that meet the client's request. Include the exected query in your response",
    [
      {
        name: 'prompt',
        description: 'the request from the client',
        type: 'string',
        required: true,
      },
    ],
  )
  async checkTasksAI(params: { prompt: string }): Promise<string> {
    const { prompt } = params;
    const response = await this.squid.ai().executeAiQuery('built_in_db', prompt);
    return `${response.answer} \n ${response.executedQuery}`;
  }
}
