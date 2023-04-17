import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerPin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Pin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly coordinates?: number[] | null;
  readonly reputation: number;
  readonly image_uri: string;
  readonly username: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Pin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly coordinates?: number[] | null;
  readonly reputation: number;
  readonly image_uri: string;
  readonly username: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Pin = LazyLoading extends LazyLoadingDisabled ? EagerPin : LazyPin

export declare const Pin: (new (init: ModelInit<Pin>) => Pin) & {
  copyOf(source: Pin, mutator: (draft: MutableModel<Pin>) => MutableModel<Pin> | void): Pin;
}