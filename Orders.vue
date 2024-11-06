<template>
    <div class="orders">
      <!-- Balance Section -->
      <div class="balance">
        <i class="fas fa-wallet balance-icon"></i>
        <span class="balance-amount">6,730 $</span>
        <i class="fas fa-chevron-right balance-arrow"></i>
      </div>
  
      <!-- Tabs -->
      <div class="tabs">
        <button :class="{ active: activeTab === 'outgoing' }" @click="setTab('outgoing')">Outgoing</button>
        <button :class="{ active: activeTab === 'inbox' }" @click="setTab('inbox')">Inbox</button>
      </div>
  
      <!-- Orders List -->
      <div v-if="activeTab === 'outgoing'" class="order-list">
        <OrderCard
          v-for="order in outgoingOrders"
          :key="order.id"
          :order="order"
        />
      </div>
  
      <!-- Bottom Navigation -->
      <div class="bottom-nav">
        <button>
          <i class="fas fa-home"></i>
          <span>Home</span>
        </button>
        <button>
          <i class="fas fa-plus-circle"></i>
          <span>New Order</span>
        </button>
        <button>
          <i class="fas fa-comments"></i>
          <span>Chat</span>
        </button>
        <button>
          <i class="fas fa-user"></i>
          <span>Profile</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import OrderCard from './OrderCard.vue';
  
  export default {
    components: {
      OrderCard,
    },
    data() {
      return {
        activeTab: 'outgoing',
        outgoingOrders: [
          {
            id: 'F15306',
            amount: '47 $',
            status: 'Processed',
            pickup: '88 Zurab Gorgiladze St, Georgia, Batumi',
            dropoff: '5 Noe Zhordania St, Georgia, Batumi',
            driver: null,
          },
          {
            id: 'F15307',
            amount: '36 $',
            status: 'Active',
            pickup: '24 Rustaveli Ave St, Georgia, Batumi',
            dropoff: '1 Sherif Khimshiashvili St, Georgia, Batumi',
            driver: { name: 'Aleksandr V.', rating: 4.9, deliverTime: '24 07 22 12:30' },
          },
        ],
      };
    },
    methods: {
      setTab(tab) {
        this.activeTab = tab;
      },
    },
  };
  </script>
  
  <style scoped>
  .orders {
    font-family: Arial, sans-serif;
  }
  
  /* Balance Section */
  .balance {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f3f4f6;
  }
  
  .balance-icon {
    font-size: 24px;
    margin-right: 10px;
  }
  
  .balance-amount {
    flex-grow: 1;
    font-size: 18px;
  }
  
  .balance-arrow {
    font-size: 14px;
  }
  
  /* Tabs */
  .tabs {
    display: flex;
    justify-content: center;
    background-color: #f8f8f8;
    padding: 5px 0;
  }
  
  .tabs button {
    flex: 1;
    padding: 10px;
    border: none;
    background: none;
    font-size: 16px;
    cursor: pointer;
  }
  
  .tabs .active {
    color: white;
    background-color: #28a745;
  }
  
  /* Order List */
  .order-list {
    padding: 10px;
  }
  
  /* Bottom Navigation */
  .bottom-nav {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    border-top: 1px solid #ddd;
    background-color: #f8f8f8;
  }
  
  .bottom-nav button {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    color: #555;
  }
  
  .bottom-nav i {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  /* 반응형 설정 */
  @media (max-width: 600px) {
    .balance {
      padding: 8px;
    }
  
    .balance-amount {
      font-size: 16px;
    }
  
    .tabs button {
      font-size: 14px;
      padding: 8px;
    }
  
    .order-list {
      padding: 8px;
    }
  
    .bottom-nav {
      padding: 8px;
    }
  
    .bottom-nav i {
      font-size: 16px;
    }
  }
  </style>
  