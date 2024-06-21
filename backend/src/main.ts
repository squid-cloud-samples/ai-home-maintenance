import { bootstrapLocalBackend, LocalBackendModule } from '@squidcloud/local-backend';
import * as backendService from './index';

/***************************************
 *                                     *
 *    SQUID CLOUD INTERNAL USE ONLY    *
 *    PLEASE DO NOT MODIFY             *
 *    THIS FILE IS USED FOR LOCAL DEV  *
 *                                     *
 **************************************/

bootstrapLocalBackend(LocalBackendModule.forRoot(backendService)).then();
