
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      token:localStorage.getItem('auth')||'',
    }
  },
  mutations: {
    setToken(state,token){
        localStorage.setItem('auth',token);
        state.token = token;
    },
    clearToken(state){
      localStorage.removeItem('auth');
      state.token = '';
    }
   
  }
})
export default store