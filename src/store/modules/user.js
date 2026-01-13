export default {
  namespaced: true,
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {}
}

// 如何使用子模块的方法
// this.$store.state.user
/**
 * mapState computed(){
 * ...mapState('模块名', ['属性名1', '属性名2']),
 * }
 */
// this.$store.getters['user/get方法名']
/**
 * mapGetters computed(){
 * ...mapGetters('模块名', ['get方法名1', 'get方法名2']),
 * }
 */
// this.$store.commit('模块名/方法名', 载荷(新值))
/**
 * mapMutations methods{
 * ...mapMutations('模块名', ['方法名1', '方法名2']),
 * }
 */
// this.$store.dispatch('模块名/方法名', 载荷(新值))
/**
 * mapActions methods{
 * ...mapActions('模块名', ['方法名1', '方法名2']),
 * }
 */
