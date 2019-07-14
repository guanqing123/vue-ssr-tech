import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div v-once>Text: {{text}}</div>
      <div v-cloak>Text: {{text}}</div> <!--vue1.0 引入页面的时候,vue没有加载前,默认不要显示 {{text}}-->
      <div v-pre>Text: {{text}}</div>
      <div v-text="'Text:' + text"></div>
      <div>Text: {{text}}</div>
      <div v-html="html"></div>
      <div v-show="active">Text: {{text}}</div>
      <div v-if="active">Text: {{text}}</div>
      <div v-else-if="text === 0">else text</div>
      <div v-else>else content</div>
      <ul>
        <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>
      </ul>
      <ul>
        <li v-for="(val, key, index) in obj">{{key}}:{{val}}:{{index}}</li>
      </ul>
      <input type="text" v-model="text"/><br/>
      <input type="checkbox" v-model="active"><br/>
      <div>
        <input type="checkbox" :value="1" v-model="arr" /><br/>
        <input type="checkbox" :value="2" v-model="arr" /><br/>
        <input type="checkbox" :value="3" v-model="arr" /><br/>
      </div>
      <div>
        <input type="radio" value="one" v-model="picked" />
        <input type="radio" value="two" v-model="picked" />
      </div>
      修饰符：<input type="text" v-model.number="number" /><br/>
      trim: <input type="text" v-model.trim="trim" /><br/>
      lazy: <input type="text" v-model.lazy="lazy" /><br/>
    </div>
  `,
  data: {
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: '',
    text: 0,
    active: false,
    html: '<span>this is html</span>',
    number: 0,
    trim: '',
    lazy: ''
  }
})
