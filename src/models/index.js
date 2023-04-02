// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Pin, StoreImage } = initSchema(schema);

export {
  Pin,
  StoreImage
};