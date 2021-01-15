<template>
    <div class="table-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="一月" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="二月" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="三月" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="四月" name="fourth">定时任务补偿</el-tab-pane>
            <el-tab-pane label="五月" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="六月" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="七月" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="八月" name="fourth">定时任务补偿</el-tab-pane>
            <el-tab-pane label="九月" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="十月" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="十一月" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="十二月" name="fourth">定时任务补偿</el-tab-pane>
            <div>
                 # 获取基金列表
    # res = requests.get('http://fund.eastmoney.com/js/fundcode_search.js')
    # content = re.findall('var r = (.*])', res.text)[0]
    # array = json.loads(content)
    # ['基金代码', '基金名称缩写', '基金名称', '基金类型', '基金名称拼音']

    # 获取非货币基金数据
    # res = requests.get('http://fundgz.1234567.com.cn/js/005827.js?rt=1463558676006')
    # content = re.findall('jsonpgz[(](.*})', res.text)[0]
    # data = json.loads(content)
    # {"fundcode": "基金代码", "name": "基金名称", "jzrq": "上次结算日期", "dwjz": "结算净值",
    #  "gsz": "当前净值", "gszzl": "当前涨幅", "gztime": "当前日期"}

    # 获取基金数据
    fundCode = '004972'
    url = 'http://api.fund.eastmoney.com/f10/lsjz'

    # 参数化访问链接，以dict方式存储
    params = {
        'callback': 'jQuery18302183990854851532_1610004838519',
        'fundCode': fundCode,
        'pageIndex': 1,
        'pageSize': 40,
    }
    # 装饰头文件
    headers = {
        'Host': 'api.fund.eastmoney.com',
        'Referer': 'http://fundf10.eastmoney.com/jjjz_%s.html' % fundCode,
    }
    res = requests.get(url=url, headers=headers, params=params)  # 发送请求
    content = re.findall('jQuery18302183990854851532_1610004838519[(](.*})', res.text)[0]
    data = json.loads(content)
    print(data)
    # content = re.findall('var r = (.*])', res.text)[0]
    # array = json.loads(content)
            </div>
        </el-tabs>
    </div>
</template>

<script>
// import api from '@/api';
// import CWRecordEdit from '@/components/finance/CWRecordEdit.vue';
export default {
    name: 'cwquarterlySummary',
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
    }
};
</script>
