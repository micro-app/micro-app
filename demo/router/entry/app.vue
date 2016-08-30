<script>
import microApp from 'micro-app';

export default {
    data () {
        return {
            icon : '',
            href : '',
            title : '',
            selected : '',
            list : [
                'yy.png',
                'huya.png',
                'duowan.png',
                'me.png',
            ],
        }
    },
    ready () {
        microApp.capable = true;
        microApp.statusBarStyle = 'black';
    },
    methods : {
        select ( index ) {
            if (this.selected === index) {
                this.selected = null;
                this.icon = '';
            } else {
                this.icon = this.list[index] + '#autosize';
                this.selected = index;
            }
        },
        focus ( event, item ) {
            if (event.target !== item) {
                event.preventDefault();
                item.focus();
                return
            }
        },
    },
    watch : {
        'title' ( val ) {
            if (val) {
                microApp.title = val;
            } else {
                microApp.title = null;
            }
        },
        'href' ( val ) {
            if (val) {
                microApp.href = /^http/.test(val) ? val : 'http://' + val;
            } else {
                microApp.href = null;
            }

        },
        'icon' ( val ) {
            if (val) {
                microApp.icon = val;
            } else {
                microApp.icon = null;
            }
        },
    },
}
</script>

<template>
    <div id="app">
        <div class="ui-title" v-touch:tap="focus($event, $els.title)">
            <span>标题</span>
            <input type="text" v-el:title v-model="title" placeholder="请输入标题">
        </div>
        <div class="ui-href" v-touch:tap="focus($event, $els.href)">
            <span>地址</span>
            <input type="text" v-el:href v-model="href" placeholder="请输入地址">
        </div>
        <div class="ui-list">
            <div class="ui-list__item"
                v-for="item in list"
                v-touch:tap="select($index)"
                v-bind:class="{ 'is-selected' : $index === selected }">
                <div class="ui-list__icon" v-bind:style="{ 'backgroundImage' : 'url(' + item + ')' }"></div>
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
    .ui-title,
    .ui-href {
        height: 0.9rem;
        font-size: 0.32rem;
        position: relative;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 0.2rem;
        padding-left: 1.5rem;
        span {
            position: absolute;
            width: 1.1rem;
            height: 0.7rem;
            line-height: 0.7rem;
            top: 0.1rem;
            left: 0.2rem;
            text-align: right;
            padding-right: 0.3rem;
            border-right: 1px solid #ccc;
        }
        input {
            margin: 0;
            padding: 0;
            border: 0;
            outline: 0;
            height: 0.8rem;
            position: relative;
            width: 100%;
        }
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
</style>
