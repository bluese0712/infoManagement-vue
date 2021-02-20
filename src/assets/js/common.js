export function timestampToTemp(timestamp, Template = '%Y-%M-%D %h:%m:%s') { // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    if (timestamp && timestamp.toString().indexOf('-') !== -1) {
        timestamp = timestamp.replace(new RegExp(/-/gm), '/');
    }
    const date = new Date(timestamp);
    const Y = date.getFullYear();
    const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Template.replace('%Y', Y).replace('%M', M).replace('%D', D).replace('%h', h).replace('%m', m).replace('%s', s);
}

export function thousandSeparator(num) {
    return num && (num
        .toString().indexOf('.') !== -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2) {
            return $2 + ',';
        }) : num.toString().replace(/(\d)(?=(\d{3})+\b)/g, function($1, $2) {
            return $2 + ',';
        }));
}
