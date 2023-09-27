function currencyFormat(n, x, y, z) {
  const xc = Math.abs(x);
  var c = isNaN(xc) ? 2 : x,
    d = y ?? '.',
    t = z ?? ',',
    s = n < 0 ? '-' : '',
    i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
    l = i.length,
    j = l > 3 ? l % 3 : 0;
  return (
    s +
    (j ? i.substr(0, j) + t : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c
      ? d +
        Math.abs(n - i)
          .toFixed(c)
          .slice(2)
      : '')
  );
}

export function formatMoney(money) {
  return currencyFormat(Number(money), 2, '.', ',');
}
