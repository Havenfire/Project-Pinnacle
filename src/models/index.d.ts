import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





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
  readonly StoreImage?: StoreImage | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly pinStoreImageId?: string | null;
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
  readonly StoreImage: AsyncItem<StoreImage | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly pinStoreImageId?: string | null;
}

export declare type Pin = LazyLoading extends LazyLoadingDisabled ? EagerPin : LazyPin

export declare const Pin: (new (init: ModelInit<Pin>) => Pin) & {
  copyOf(source: Pin, mutator: (draft: MutableModel<Pin>) => MutableModel<Pin> | void): Pin;
}

type EagerStoreImage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StoreImage, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly file_name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStoreImage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StoreImage, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly file_name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StoreImage = LazyLoading extends LazyLoadingDisabled ? EagerStoreImage : LazyStoreImage

export declare const StoreImage: (new (init: ModelInit<StoreImage>) => StoreImage) & {
  copyOf(source: StoreImage, mutator: (draft: MutableModel<StoreImage>) => MutableModel<StoreImage> | void): StoreImage;
}