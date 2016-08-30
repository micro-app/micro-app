<script>
import microApp from 'micro-app';

export default {
    data () {
        return {
            selected : null,
            list : [
                {
                    title : '2048',
                    icon : 'img/2048.png',
                    statusBarStyle : 'black',
                    href : '/app-store/app-2048.html',
                },
                {
                    title : 'FlappyBird',
                    icon : 'img/flappy-bird.jpg',
                    statusBarStyle : 'black-translucent',
                    href : '/app-store/app-flappy-bird.html',
                },
            ],
        };
    },
    ready () {
        microApp.capable = true;
        microApp.globalFilters = 'autosize';
        this.init();
    },
    methods : {
        init () {
            microApp.href = null;
            microApp.title = document.title;
            microApp.statusBarStyle = 'black';
            microApp.icon = 'img/app-store.png';
        },
        select ( index ) {
            if (this.selected === index) {
                this.init();
                this.selected = null;
            } else {
                let item = this.list[index];
                microApp.icon = item.icon;
                microApp.href = item.href;
                microApp.title = item.title;
                microApp.statusBarStyle = item.statusBarStyle;
                this.selected = index;
            }
        },
    },
}
</script>

<template>
    <div id="app">
        <div class="ui-title">app store</div>
        <div class="ui-list">
            <div class="ui-list__item"
                v-for="item in list"
                v-touch:tap="select($index)"
                v-bind:class="{ 'is-selected' : $index === selected }">
                <div class="ui-list__icon" v-bind:style="{ 'backgroundImage' : 'url(' + item.icon + ')' }"></div>
                <div class="ui-list__title">{{ item.title }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "./base/base";
    html,
    body {
        position: relative;
    }
    body {
        padding: 0.2rem;
        color: #333;
        font-weight: 300;
    }
    .ui-title {
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.32rem;
        text-align: center;
        border-bottom: 1px solid #ccc;
    }
    .ui-list {
        &::after {
            content: "";
            clear: both;
            display: table;
        }
    }
    .ui-list__item {
        float: left;
        width: 50%;
        padding: 0.3rem;
    }
    .ui-list__icon {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 15px;
        overflow: hidden;
        border: 2px solid #fff;
        .is-selected & {
            border-color: rgb(70, 156, 188);
        }
    }
    .ui-list__title {
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.28rem;
        text-align: center;
        margin-top: 0.2rem;
        .is-selected & {
            font-weight: 700;
            color: rgb(70, 156, 188);
        }
    }
</style>
