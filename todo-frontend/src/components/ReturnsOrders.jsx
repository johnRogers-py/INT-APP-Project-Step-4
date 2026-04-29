import React, { useState } from 'react';
import styles from './ReturnsOrders.module.css';

const MOCK_ORDERS = [
  {
    id: 'AMZ-2024-83741',
    date: 'March 15, 2024',
    status: 'Delivered',
    deliveredDate: 'March 18, 2024',
    total: 279.99,
    items: [
      {
        title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        image: 'https://picsum.photos/seed/sony-headphones/300/300',
        price: 279.99,
        qty: 1,
      },
    ],
  },
  {
    id: 'AMZ-2024-61209',
    date: 'February 28, 2024',
    status: 'Delivered',
    deliveredDate: 'March 2, 2024',
    total: 129.98,
    items: [
      {
        title: 'Logitech MX Master 3S Wireless Performance Mouse',
        image: 'https://picsum.photos/seed/logitech-mouse/300/300',
        price: 89.99,
        qty: 1,
      },
      {
        title: 'Anker 7-in-1 USB C Hub Adapter',
        image: 'https://picsum.photos/seed/anker-hub/300/300',
        price: 39.99,
        qty: 1,
      },
    ],
  },
  {
    id: 'AMZ-2024-44892',
    date: 'January 10, 2024',
    status: 'Delivered',
    deliveredDate: 'January 13, 2024',
    total: 139.99,
    items: [
      {
        title: 'Kindle Paperwhite (16 GB) — With Ads',
        image: 'https://picsum.photos/seed/kindle-pw/300/300',
        price: 139.99,
        qty: 1,
      },
    ],
  },
];

const STATUS_STYLE = {
  Delivered: styles.statusDelivered,
  Shipped: styles.statusShipped,
  Processing: styles.statusProcessing,
  Cancelled: styles.statusCancelled,
};

function OrderCard({ order }) {
  const [returning, setReturning] = useState(false);
  const [returnSubmitted, setReturnSubmitted] = useState(false);
  const [returnReason, setReturnReason] = useState('');

  return (
    <div className={styles.orderCard}>
      {/* Order Header */}
      <div className={styles.orderHeader}>
        <div className={styles.orderMeta}>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>ORDER PLACED</span>
            <span className={styles.metaValue}>{order.date}</span>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>TOTAL</span>
            <span className={styles.metaValue}>${order.total.toFixed(2)}</span>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>SHIP TO</span>
            <span className={`${styles.metaValue} ${styles.shipTo}`}>John Rogers ▾</span>
          </div>
        </div>
        <div className={styles.orderIdWrap}>
          <span className={styles.orderIdLabel}>ORDER # {order.id}</span>
          <div className={styles.orderHeaderBtns}>
            <button className={styles.linkBtn}>View order details</button>
            <button className={styles.linkBtn}>Invoice</button>
          </div>
        </div>
      </div>

      {/* Order Body */}
      <div className={styles.orderBody}>
        {/* Status */}
        <div className={styles.statusRow}>
          <span className={`${styles.statusBadge} ${STATUS_STYLE[order.status] || ''}`}>
            {order.status}
          </span>
          {order.deliveredDate && (
            <span className={styles.statusDate}>
              {order.status === 'Delivered' ? 'Delivered ' : 'Expected '}
              {order.deliveredDate}
            </span>
          )}
        </div>

        {/* Items */}
        <div className={styles.itemsWrap}>
          {order.items.map((item, idx) => (
            <div key={idx} className={styles.itemRow}>
              <div className={styles.itemImgWrap}>
                <img src={item.image} alt={item.title} className={styles.itemImg} />
              </div>
              <div className={styles.itemInfo}>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={styles.itemMeta}>
                  Qty: {item.qty} · ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        {!returnSubmitted ? (
          <div className={styles.actions}>
            {order.status === 'Delivered' && (
              <>
                <button className={styles.btnYellow} onClick={() => setReturning(v => !v)}>
                  {returning ? 'Cancel return' : 'Return items'}
                </button>
                <button className={styles.btnOutline}>Write a product review</button>
                <button className={styles.btnOutline}>Track package</button>
                <button className={styles.btnOutline}>Buy it again</button>
              </>
            )}
            {order.status === 'Shipped' && (
              <button className={styles.btnYellow}>Track package</button>
            )}

            {/* Return Form */}
            {returning && (
              <div className={styles.returnForm}>
                <h4 className={styles.returnTitle}>Why are you returning this?</h4>
                <div className={styles.returnOptions}>
                  {[
                    'No longer needed',
                    'Defective or broken',
                    'Wrong item sent',
                    'Better price available',
                    'Item damaged',
                    'Accidentally ordered',
                  ].map(reason => (
                    <label key={reason} className={styles.returnOption}>
                      <input
                        type="radio"
                        name={`return-${order.id}`}
                        value={reason}
                        checked={returnReason === reason}
                        onChange={() => setReturnReason(reason)}
                      />
                      {reason}
                    </label>
                  ))}
                </div>
                <button
                  className={styles.btnYellow}
                  disabled={!returnReason}
                  onClick={() => { setReturnSubmitted(true); setReturning(false); }}
                >
                  Submit return request
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.returnConfirm}>
            <span className={styles.returnConfirmIcon}>✓</span>
            <div>
              <p className={styles.returnConfirmTitle}>Return request submitted</p>
              <p className={styles.returnConfirmSub}>
                Reason: <em>{returnReason}</em>. You'll receive a prepaid return label by email within 24 hours.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReturnsOrders({ onBack }) {
  const [tab, setTab] = useState('orders');
  const [timeFilter, setTimeFilter] = useState('last6');

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>← Back to shop</button>
        <h1 className={styles.pageTitle}>Your Orders</h1>
      </div>

      <div className={styles.layout}>
        {/* Tabs */}
        <div className={styles.tabs}>
          {[
            { key: 'orders', label: 'Orders' },
            { key: 'buy-again', label: 'Buy Again' },
            { key: 'not-shipped', label: 'Not Yet Shipped' },
            { key: 'cancelled', label: 'Cancelled Orders' },
          ].map(t => (
            <button
              key={t.key}
              className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className={styles.filtersRow}>
          <span className={styles.resultsCount}>
            {tab === 'orders' ? `${MOCK_ORDERS.length} orders` : '0 orders'} placed in
          </span>
          <select
            className={styles.timeSelect}
            value={timeFilter}
            onChange={e => setTimeFilter(e.target.value)}
          >
            <option value="last3">past 3 months</option>
            <option value="last6">past 6 months</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        {/* Orders List */}
        {tab === 'orders' ? (
          <div className={styles.ordersList}>
            {MOCK_ORDERS.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyTab}>
            <div className={styles.emptyIcon}>📦</div>
            <h3 className={styles.emptyTitle}>No orders to show</h3>
            <p className={styles.emptySub}>You have no orders in this category.</p>
            <button className={styles.btnYellow} onClick={onBack}>Continue Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReturnsOrders;
