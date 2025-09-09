import { Branch } from '@quark/node';

const serviceBroker = new Branch(process.env.QUARK_SERVICE_NAME, { port: Number(process.env.QUARK_SERVICE_CORE_PORT) });

export { serviceBroker };
