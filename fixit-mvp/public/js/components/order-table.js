class OrderTable extends HTMLElement {
  static template(orders, escape) {
    if (!orders || !orders.length) {
      return `<p class="sub" style="padding:16px 8px;text-align:center">Chưa có dữ liệu đơn hàng.</p>`;
    }
    return `<table><thead><tr><th>Mã đơn</th><th>Sản phẩm</th><th class="hide">Kênh</th><th>Trạng thái</th><th></th></tr></thead><tbody>${orders.map((order) => `<tr><td><b>${escape(order.code)}</b></td><td>${escape(order.product)}</td><td class="hide">${escape(order.channel)}</td><td><span class="tag">${escape(order.status)}</span></td><td>${order.status === 'Chờ xác nhận' ? `<button class="link" data-action="confirm" data-code="${escape(order.code)}">Xác nhận</button>　` : ''}<button class="link" data-action="pack" data-code="${escape(order.code)}">Quay đóng gói</button></td></tr>`).join('')}</tbody></table>`;
  }
  connectedCallback() {
    this.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action]');
      if (button) this.dispatchEvent(new CustomEvent('fixit-order-action', { bubbles: true, detail: { action: button.dataset.action, code: button.dataset.code } }));
    });
  }
}
window.FixItOrderTable = OrderTable;
if (!customElements.get('fixit-order-table')) {
  customElements.define('fixit-order-table', OrderTable);
}
