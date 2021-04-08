import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { MailTrapProvider } from './implementations/MailTrapProvider';

container.register<IMailProvider>('MailTrapProvider', MailTrapProvider);
