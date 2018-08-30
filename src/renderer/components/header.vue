<template>
    <div class="title">
        <span>saltmine</span>
        <div id="windowControl">
            <a href="#" class="config">Config</a>
            <a href="#" class="close">Close</a>
        </div>
    </div>
</template>

<script>

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
                    top: 5px;
                    content: ' ';
                    height: 30px;
                    width: 2px;
                    background-color: #fff;
                }
                &::before{transform:rotate(45deg);}
                &::after{transform:rotate(-45deg);}
            }
        }
        
    }
</style>