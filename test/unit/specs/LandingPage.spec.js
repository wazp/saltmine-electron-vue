import Vue from 'vue'
import LandingPage from '@/pages/LandingPage'

describe('LandingPage.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(LandingPage)
    }).$mount()

    expect(vm.$el.querySelector('.top input').getAttribute('placeholder')).to.contain('What are you working on?')
  })
})
