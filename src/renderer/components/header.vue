<template>
    <div class="title">
        <span>saltmine</span>
        <div id="windowControl">
            <a @click="config" class="config">Config</a>
            <a @click="close" class="close">Close</a>
        </div>
    </div>
</template>

<script>
  import { ipcRenderer } from 'electron'

  export default {
    name: 'titlebar',
    methods: {
      close () {
        this.$electron.remote.getCurrentWindow().close()
      },
      config () {
        let b = document.getElementsByTagName('body')[0]
        if (!b.classList.contains('preferences')) {
          ipcRenderer.send('switchIcon', 'on')
          b.classList.add('preferences')
          b.classList.add('is-open')
        } else {
          ipcRenderer.send('switchIcon', 'off')
          document.getElementById('preferences').addEventListener('transitionend', () => {
            b.classList.remove('preferences')
          })
          b.classList.remove('is-open')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    div.title{
        height:40px;
        background:#202020;
        padding:10px 0 10px 10px;
        display:flex;
        flex-direction:row;
        flex-wrap:nowrap;
    }
    span{color:#fff;flex-grow:1;}
    #windowControl{
        -webkit-app-region:no-drag;
        width:80px;
        height:40px;
        margin:-10px 0 0 0;
        font-size:0;

        a{
            width:40px;
            height:40px;
            display:inline-block;
            text-indent:-9999px;
            position:relative;
            
            &.close{
                &::before, &::after{
                    position: absolute;
                    left: 20px;
                    top: 7px;
                    content: ' ';
                    height: 25px;
                    width: 2px;
                    background-color: #fff;
                }
                &::before{transform:rotate(45deg);}
                &::after{transform:rotate(-45deg);}
            }

            &.config{
                background-image:url('../assets/global-settings.svg');
                background-size: 60% 60%;
                background-repeat: no-repeat;
                background-position: 50% 50%;
            }

            &:hover{background-color:rgba(255,255,255,.2)}
        }
        
    }
</style>