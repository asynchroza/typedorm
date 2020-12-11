import KSUID from 'ksuid';
import {v4} from 'uuid';
import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  AutoGenerateAttributeRawMetadataOptions,
} from '@typedorm/common';

export const IsAutoGeneratedAttributeMetadata = (
  attr: any
): attr is AutoGeneratedAttributeMetadata => !!attr.strategy;

export type AutoGeneratedAttributeMetadataOptions = AutoGenerateAttributeRawMetadataOptions;

export class AutoGeneratedAttributeMetadata {
  readonly value: any;
  readonly strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY;
  readonly autoUpdate: boolean;
  readonly name: string;
  readonly type: string;
  readonly unique: boolean;

  constructor({
    name,
    type,
    strategy,
    autoUpdate,
    unique,
  }: AutoGeneratedAttributeMetadataOptions) {
    this.autoUpdate = !!autoUpdate;
    this.unique = !!unique;
    this.name = name;
    this.type = type;
    this.strategy = strategy;
    this.value = this.autoGenerateValue(strategy);
  }

  autoGenerateValue(strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY) {
    switch (strategy) {
      case AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4: {
        return v4();
      }
      case AUTO_GENERATE_ATTRIBUTE_STRATEGY.KSUID: {
        return KSUID.randomSync(new Date()).string;
      }
      case AUTO_GENERATE_ATTRIBUTE_STRATEGY.ISO_DATE: {
        return new Date().toISOString();
      }
      case AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE: {
        return Math.ceil(new Date().valueOf() / 1000);
      }
      default: {
        throw new Error('Unknown attribute strategy.');
      }
    }
  }
}
