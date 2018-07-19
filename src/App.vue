<template>
  <div id="app">
    <header>
      <b-navbar toggleable="md" type="dark" variant="dark">
        <b-container>
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-navbar-brand to="/">Lusus</b-navbar-brand>
          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="mr-auto">
              <b-nav-item to="/test">Test</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </header>
    <b-container class="app-body">
      <router-view></router-view>
    </b-container>
    <footer>
      <b-navbar toggleable="md" type="dark" variant="dark" fixed="bottom">
        <b-container>
          <b-navbar-nav class="mr-auto">
            <b-nav-text>
              &copy; {{year}} - <a href="#" target="_blank">Venatio Studios</a>
            </b-nav-text>
          </b-navbar-nav>
        </b-container>
      </b-navbar>
    </footer>
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
 padding-top: 10px;
}
</style>
