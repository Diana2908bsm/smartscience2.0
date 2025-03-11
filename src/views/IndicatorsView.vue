<template>
    <div>
      <button @click="addItem">Добавить элемент</button>
      <ul>
        <li 
          v-for="(item, index) in items" 
          :key="index" 
          :ref="setItemRef(index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: ["Элемент 1", "Элемент 2"],
        itemRefs: []
      };
    },
    methods: {
      addItem() {
        this.items.push(`Элемент ${this.items.length + 1}`);
        
        // Ждем, пока Vue обновит DOM
        this.$nextTick(() => {
          const lastItem = this.itemRefs[this.items.length - 1];
          if (lastItem) {
            lastItem.classList.add("highlight");
            // Убираем класс через 1 секунду
            setTimeout(() => lastItem.classList.remove("highlight"), 1000);
          }
        });
      },
      setItemRef(index) {
        return el => {
          if (el) this.itemRefs[index] = el;
        };
      }
    }
  };
  </script>
  
  <style>
  .highlight {
    background-color: yellow;
    transition: background-color 0.5s ease;
  }
  </style>