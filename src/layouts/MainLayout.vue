<template>
  <q-layout view="lHh lpR lFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          :icon="leftDrawerOpen ? 'menu_open' : 'menu'"
          @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-h5">
          Shopping list
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      elevated
      :width="180"
      class="bg-grey-4">
      
      <div class="text-center">
      <q-icon
        name="shopping_bag"
        color="grey-5"
        size="55px"
        class="q-pa-sm" />
      </div>
      
      <q-list
        separator
        class="q-ml-xs text-grey-9">
        
        <q-item
          to='/'
          clickable
          v-ripple
          exact
          active-class="bg-white text-primary">
          <q-item-section avatar>
            <q-icon
              name='list'
              size="md" />
          </q-item-section>
          <q-item-section
            class="text-h6">
              My list
          </q-item-section>
        </q-item>
        
        <q-item
          to='/help'
          clickable
          v-ripple
          exact
          active-class="bg-white text-primary">
          <q-item-section avatar>
            <q-icon
              name="help"
              size="md" />
          </q-item-section>
          <q-item-section
            class="text-h6">
              Help
          </q-item-section>
        </q-item>
      
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
