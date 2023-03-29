// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Pin } = initSchema(schema);

export {
  Pin
};