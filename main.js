auto.waitFor()

toast('执行脚本')

var appName = 'iBox';
var production = '七星石';
var tagPrice = 3560
var flag = 0
var wait = 2000
var step2 = 1

if (!step2) {

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

}

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

                let finded = className('android.widget.Button').untilFind().filter((item) => item.contentDescription)[0]

                console.log(finded.contentDescription)

                if (finded.contentDescription == '立即购买') {

                    // className('android.widget.Button').desc('立即购买').findOne().click()

                    finded.click()

                    id('tv_title').waitFor()

                    sleep(100)

                    let qianbao = id('tv_pay_type').className('android.widget.TextView').untilFind()

                    // console.log(qianbao)

                    console.log(qianbao.length)



                    if (id("tv_pay_type").className("android.widget.TextView").text("银行卡").exists()) {

                        console.log('银行卡')

                        id("tv_pay_type").className("android.widget.TextView").text("银行卡").findOne().parent().click()
                    }
                    else if (id("tv_pay_type").className("android.widget.TextView").text("钱包B").exists()) {

                        console.log('钱包B')

                        id("tv_pay_type").className("android.widget.TextView").text("钱包B").findOne().parent().click()
                    }

                    // if (id("tv_pay_type").className("android.widget.TextView").text("银行卡").findOne().parent().exists()) {

                    //     id("tv_pay_type").className("android.widget.TextView").text("银行卡").findOne().parent().click()

                    // }
                    // else if (id("tv_pay_type").className("android.widget.TextView").text("钱包B").findOne().parent().exists()) {

                    //     id("tv_pay_type").className("android.widget.TextView").text("钱包B").findOne().parent().click()

                    // }

                    sleep(200)

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

                }
                else {

                    openPriceList()

                    return
                }

                break

            }

        }
    }

    sleep(100)

    //关闭价格弹窗
    className("android.widget.Button").findOne().click()

    openPriceList()

}

openPriceList()

console.log('结束')
