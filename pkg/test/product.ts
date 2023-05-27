import { IPlugin } from '@shell/core/types';

export const EXPLORER = 'explorer'
export function init(plugin: IPlugin, store: any) {

  const { basicType } = plugin.DSL(store, EXPLORER)
  basicType(['kubevirt.io.virtualmachine', 'kubevirt.io.virtualmachineinstance'], 'workload');
}