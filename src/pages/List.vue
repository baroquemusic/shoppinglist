<template>
  <q-page>
    <q-scroll-area class="absolute full-width full-height">
      
      <div class="row items-center">
        <div class="col">
          <q-input
            v-model="newItem"
            placeholder="Add item"
            autogrow
            autofocus
            filled
            class="q-ma-lg text-black text-h6">
            <template v-slot:append>
              <q-icon
                v-if="newItem !== ''"
                name="close"
                @click="newItem = ''"
                class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addItem"
            :disable="!newItem"
            round
            dense
            flat
            size="xl"
            class="q-mr-md"
            style="margin-left: -10px"
            color="secondary"
            icon="send" />
        </div>
      </div>

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeInDown slow"
          leave-active-class="animated fadeOutRight slow">
          <q-item
            class="bg-secondary text-white text-weight-bold text-h6"
            v-for="item in items"
            :key="item.id">
            <div class="row items-center full-width">
              <div class="col col-shrink">
                <q-item-section>
                  <q-btn
                    @click="toDone(item)"
                    flat
                    round
                    dense
                    size="20px"
                    class="text-primary"
                    icon="check_circle" />
                </q-item-section>
              </div>
              <div class="col">
                <q-item-section>
                  {{ item.item }}
                </q-item-section>
              </div>
              <div class="col col-shrink items-end">
                <q-item-section>
                  <q-btn
                    @click="deleteItem(item)"
                    flat
                    round
                    text-color="negative"
                    icon="delete" />
                </q-item-section>
              </div>
            </div>
            
          </q-item>
        </transition-group>
      </q-list>

      <q-separator size="20px" class="bg-white" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeInLeft slow"
          leave-active-class="animated fadeOutRight slow">
          <q-item
            class="bg-grey-5 text-grey-7 text-body1"
            v-for="itemdone in itemsDone"
            :key="itemdone.id">
            <div class="row items-center full-width">
              <div class="col col-shrink">
                <q-item-section>
                  <q-btn
                    @click="toList(itemdone)"
                    flat
                    round
                    dense
                    class="text-grey-7"
                    icon="unarchive" />
                </q-item-section>
              </div>
              <div class="col">
                <q-item-section class="text-strike">
                  {{ itemdone.item }}
                </q-item-section>
              </div>
              <div class="col col-shrink items-end">
                <q-item-section>
                  <q-btn
                    @click="deleteDoneItem(itemdone)"
                    flat
                    round
                    dense
                    class="q-mr-xs"
                    text-color="text-grey-8"
                    icon="delete" />
                </q-item-section>
              </div>
            </div>
            
          </q-item>
        </transition-group>
      </q-list>

      <q-separator size="20px" class="bg-white" />

      <div class="text-right q-mr-md">
        <q-btn
        v-if="items != '' || itemsDone != ''"
        icon="auto_awesome"
        size="xl"
        flat
        round
        dense
        color="negative"
        @click="deleteAll(items, itemsDone)" />
      </div>

    </q-scroll-area>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { collection, doc, deleteDoc, addDoc, query, onSnapshot } from 'firebase/firestore'
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'List',
  data() {
    return {
      newItem: '',
      items: [],
      itemsDone: []
    }
  },
  methods: {
    addItem() {
      let newItem = {
        item: this.newItem
      }
    const docRef = addDoc(collection(db, 'items'), newItem)
    this.newItem = ''
    },
    deleteItem(item) {
      deleteDoc(doc(db, 'items', item.id))
    },
    toDone(item) {
      deleteDoc(doc(db, 'items', item.id))
      const docRef = addDoc(collection(db, 'itemsDone'), item)
    },
    toList(item) {
      deleteDoc(doc(db, 'itemsDone', item.id))
      const docRef = addDoc(collection(db, 'items'), item)
    },
    deleteDoneItem(item) {
      deleteDoc(doc(db, 'itemsDone', item.id))
    },
    deleteAll(items, itemsDone) {
      this.$q.dialog({
        title: 'New List',
        message: 'Delete all items on your shopping list?',
        cancel: true,
        class: 'text-body1',
        persistent: true
      }).onOk(() => {
        items.forEach((item) => {
          deleteDoc(doc(db, 'items', item.id))
        })
        itemsDone.forEach((item) => {
          deleteDoc(doc(db, 'itemsDone', item.id))
        })
      })
    }
  },
  mounted() {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let itemChange = change.doc.data()
        itemChange.id = change.doc.id
        if (change.type === "added") {
          this.items.unshift(itemChange)
        }
        if (change.type === "removed") {
          let index = this.items.findIndex(item => item.id === itemChange.id)
          this.items.splice(index, 1)
        }
      })
    })
    const qd = query(collection(db, 'itemsDone'))
    const unsubscribe2 = onSnapshot(qd, (snapshot2) => {
      snapshot2.docChanges().forEach((change2) => {
        let itemChange2 = change2.doc.data()
        itemChange2.id = change2.doc.id
        if (change2.type === "added") {
          this.itemsDone.unshift(itemChange2)
        }
        if (change2.type === "removed") {
          let index2 = this.itemsDone.findIndex(item2 => item2.id === itemChange2.id)
          this.itemsDone.splice(index2, 1)
        }
      })
    })
  }
})
</script>
