auto.waitFor()

toast('执行脚本')

var appName = 'iBox';
var production = '托塔';
var tagPrice = '21000';
var flag = 0
var wait = 2000
launchApp(appName)

sleep(2000)

var search = id("home_top_search_view")

search.click()

var search2 = id("et_keywords_input")

search2.setText(production)

var button = id("tv_operate_btn")

sleep(1000)

button.click()

var content = id("fl_search_list_viewpager")

content.waitFor()

var item = id("rl_list_item_root_view").findOne()

item.click()

function openPriceList() {

    className('android.view.View').desc('所属专辑').waitFor()

    var all = className("android.view.View").untilFind()

    for (let item of all) {

        if (String(item.contentDescription).indexOf('全部编号') > -1) {

            item.click()

            break
        }

    }

    className('android.view.View').desc('商品列表').waitFor()

    sleep(wait)

    var priceItem = className("android.view.View").untilFind()

    for (let item of priceItem) {

        if (String(item.contentDescription).includes('寄售\n')) {

            var price = item.contentDescription.split(' ')

            price = parseFloat(price[price.length - 1])

            if (!isNaN(price) && price <= tagPrice) {

                console.log(price)

                item.click()

                sleep(600)

                className('android.widget.Button').desc('立即购买').findOne().click()

                id('tv_title').waitFor()

                id('btn_oprate').findOne().click()

                className('android.widget.FrameLayout').depth(1).waitFor()

                id('tv_pay').findOne().click()

                sleep(2000)

                if (id('tv_title').findOne()) {

                    back()

                    sleep(2000)

                    openPriceList()
                }

                return

                break

            }

        }
    }

    sleep(600)

    //关闭价格弹窗
    className("android.widget.Button").findOne().click()

    openPriceList()

}

openPriceList()

console.log('结束')
