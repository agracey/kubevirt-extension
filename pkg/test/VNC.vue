<script>
import RFB from '@novnc/novnc/core/rfb';
import BrandImage from '@shell/components/BrandImage';


const url = `wss://${ window.location.hostname }:${ window.location.port }/k8s/clusters/c-m-plnvrr2d/apis/subresources.kubevirt.io/v1alpha3/namespaces/default/virtualmachineinstances/testvm/vnc`;


export default {
  name: 'VNC',

  layout: 'plain',

  data() {
    const params = { ...this.$route.params };
    console.log(params)

    return {
      rfb:          null,
      connected:    false,
      disconnected: false,
    };
  },


  mounted() {
    const params = { ...this.$route.params };
    const url = `wss://${ window.location.hostname }:${ window.location.port }/k8s/clusters/${params.cluster}/apis/subresources.kubevirt.io/v1alpha3/namespaces/${params.namespace}/virtualmachineinstances/${params.vmi}/vnc`;

    this.$nextTick(() => {
      const rfb = new RFB(this.$refs.view, url);

      rfb.addEventListener('connect', () => {
        this.connected = true;
      });
      rfb.addEventListener('disconnect', (e) => {
        this.disconnected = true;
      });

      this.rfb = rfb;
    });
  }
};

</script>
<template>
  <div>
    <div v-if="connected && disconnected">
      <main class="main-layout error">
        <div class="text-center">
          <h1>
            {{ t('generic.notification.title.warning') }}
          </h1>
          <h2 class="text-secondary mt-20">
            {{ t('vncConsole.error.message') }}
          </h2>
        </div>
      </main>
    </div>
    <div
      ref="view"
    />
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    text-align: center;
  }

  .vnc {
    align-items: center;
    display: flex;
    justify-content: center;
  }
</style>