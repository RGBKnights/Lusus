<template>
  <div id="app">
    <b-container fluid>
      <header>
        <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand to="/">Lusus</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
              <b-navbar-nav>
                <b-nav-item to="/test">Test</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
        </b-navbar>
      </header>
      <div class="app-body">
        <router-view></router-view>
      </div>
      <footer>
        <b-navbar toggleable="md" type="dark" variant="dark" fixed="bottom">
          <b-navbar-nav class="mr-auto">
            <b-nav-text>
              &copy; {{year}} - <a href="#" target="_blank">Venatio Studios</a>
            </b-nav-text>
          </b-navbar-nav>
        </b-navbar>
      </footer>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      'year': new Date().getFullYear()
    }
  }
}
</script>

<style>
.app-body {
 padding-top: 60px;
}
</style>
