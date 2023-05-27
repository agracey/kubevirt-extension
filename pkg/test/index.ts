import { importTypes } from '@rancher/auto-import';
import { IPlugin, ActionOpts,
  ActionLocation } from '@shell/core/types';

import VNC from './VNC.vue';

const stopVM = (_: ActionOpts, values: any[])=>{

  values.forEach((obj)=>{
    obj.spec.running = false
    obj.save()
  })
}

const startVM = (_: ActionOpts, values: any[])=>{

  values.forEach((obj)=>{
    obj.spec.running = true
    obj.save()
  })
}

const openVNC = (_: ActionOpts, values: any[])=>{

  values.forEach((obj)=>{
    console.log(obj, this)
    const {name, namespace} = obj.metadata
    const cluster = document.location.pathname.split('/')[2]

    window.open(`/VMs/c/${cluster}/${namespace}/${name}/vnc`)

  })
}

export const EXPLORER = 'explorer'

// Init the package
export default function(plugin: IPlugin, store: any) {
  // Auto-import model, detail, edit from the folders
  importTypes(plugin);


  // Provide plugin metadata from package.json
  plugin.metadata = require('./package.json');

  // Load a product
  plugin.addProduct(require('./product'));


  plugin.addAction( 
    ActionLocation.TABLE,
    { resource: ['kubevirt.io.virtualmachine'] }, 
    { label: 'Stop',
    icon:       'icon-close', invoke: stopVM });

  plugin.addAction( 
    ActionLocation.TABLE,
    { resource: ['kubevirt.io.virtualmachine'] }, 
    { label: 'Start',
    icon:       'icon-play', invoke: startVM });

    // Filtering: TODO add GH issue to request capability

  plugin.addAction( 
    ActionLocation.TABLE,
    { resource: ['kubevirt.io.virtualmachine'] }, 
    { label: 'VNC',
    icon:       'icon-show', invoke: openVNC });

  plugin.addRoute({
      name:      'VMs-c-cluster-vmi-vnc',
      path:      '/VMs/c/:cluster/:namespace/:vmi/vnc',
      component: VNC,
      meta:      {
        product: "VMs",
        cluster: "_"
      },
    });

}
