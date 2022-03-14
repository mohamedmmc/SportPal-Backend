const puppeteer = require('puppeteer');
const cron = require('node-cron');
var express = require('express');
var router = express.Router();
const myNews = require('../models/News');
const News = require('../models/News');

//Route


//Cron scheduled every minute !!

//cron.schedule('* * * * *', () => {console.log("Task is running every minute " + new Date())});

//get all news
router.get('/', async function (req, res, next) {
    const news = await myNews.find();
    res.status(200).json(news)
})

//get all Tennis
router.get('/get-Tennis', async function (req, res, next) {
    const newsKoura = await myNews.find({ type: "Tennis" });
    res.status(200).json({ news: newsKoura })
})

//get all Koora2
router.get('/get-Koora2', async function (req, res, next) {
    const newsKoura = await myNews.find({ type: "Football-Koora" });
    res.status(200).json({ news: newsKoura })
}
)
// Get From https://www.tennis.com/news/all-news/

router.get('/Tennis', async function (req, res, next) {
    try {
        const browser = await puppeteer.launch({ headless: true, devtools: true });

        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(0)

        await page.goto("https://www.tennis.com/news/all-news/")

        const newsArticles = await page.evaluate(() => {
            let articles = {};
            [...document.querySelectorAll('a.-story')]?.forEach((el) => {

                let url = el.href;
                articles[url] = {
                    imageURL: el.querySelector('.img-responsive')?.dataset.src,
                    // title: el.innerText,
                }
            })

            return articles
        })

        let count = 0

        for (let link in newsArticles) {

            let newsArticle = newsArticles[link]

            await page.goto(link)

            let articleDetails = await page.evaluate(() => {
                // let i = document.querySelector('div > figure > picture > source')?.srcset.split('1x')[0]
                return {
                    //      img: i,
                    title: document.querySelector('.oc-c-article__title')?.innerText.trim(),
                    desc: document.querySelector('.oc-c-markdown-stories')?.innerText.trim(),
                }

            })

            newsArticles[link] = { ...newsArticle, articleDetails }

            count++

            if (count == 12) { break }

            thisNews = new News({
                title: newsArticles[link].articleDetails.title,
                desc: newsArticles[link].articleDetails.desc,
                imageURL: newsArticles[link].imageURL,
                type: 'Tennis'
            })

            myNews.insertMany(thisNews).then((docs) => {
                console.log("Multiple documents inserted to Collection");
            }).catch((err) => {
                console.error(err);
            })
        }

        // await browser.close()

        res.status(200).json(Object.values(newsArticles))

        //res.status(200).json(thisNews)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }

});

// Get From https://www.goalzz.com/

router.get('/Goalzz/tennis', async function (req, res, next) {
    try {
        const browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();
        await page.goto("https://www.goalzz.com/?tennis=h")

        const news = await page.evaluate(() => {
            let news = [];
            let elements = document.querySelectorAll('div.newsList > ul > li')
            for (element of elements) {

                let i = element.querySelector('a > img')?.src.split('&')[0]
                news.push({
                    imageURL: i,
                    title: element.querySelector('div.inline > a > strong')?.innerText.trim(),
                    desc: element.querySelector('div.inline > p')?.innerText.trim(),
                })
            }
            return news;
        });

        console.log('Goalzz', news)

        await browser.close()

        myNews.insertMany(news).then((docs) => {
            console.log("Multiple documents inserted to Collection");
        }).catch((err) => {
            console.error(err);
        })

        res.status(200).json(news)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }

});

// Get From https://www.foot24.tn

router.get('/Foot24', async function (req, res, next) {
    try {
        const browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();
        await page.goto("https://www.foot24.tn/ar")

        const news = await page.evaluate(() => {
            let news = [];
            let elements = document.querySelectorAll('div.dc-news-item');
            for (element of elements) {
                let i = element.querySelector('.dc-image-cover')?.style.getPropertyValue('background-image').split("\"")[1]
                news.push({
                    imageURL: i,
                    type: element.querySelector('.dc-cate')?.innerText.trim(),
                    title: element.querySelector('.dc-cate-tle')?.innerText.trim(),
                    type: 'Football-Foot24',
                })
            }
            return news;
        });

        console.log('Foot24', news)

        await browser.close()

        myNews.insertMany(news).then((docs) => {
            console.log("Multiple documents inserted to Collection");
        }).catch((err) => {
            console.error(err);
        })

        res.status(200).json(news)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }

});

// Get From https://www.kooora.com/

router.get('/Koora', async function (req, res, next) {
    try {
        const browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();
        await page.goto("https://www.kooora.com/")

        const news = await page.evaluate(() => {
            let news = [];
            let elements = document.querySelectorAll('div.newsList > ul > li')
            for (element of elements) {

                let i = element.querySelector('a > img')?.src.split('&')[0]
                news.push({
                    img: i,
                    title: element.querySelector('div.inline > a > strong')?.innerText.trim(),
                    desc: element.querySelector('div.inline > p')?.innerText.trim(),
                })
            }
            return news;
        });

        console.log('Koora', news)

        await browser.close()

        res.status(200).json(news)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }

});


router.get('/Koora2', async function (req, res, next) {
    try {
        const browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();
        await page.goto("https://www.kooora.com/")

        const news = await page.evaluate(() => {
            let news = [];
            let elements = document.querySelectorAll('div.newsList > ul > li')
            for (element of elements) {

                let i = element.querySelector('a > img')?.src.split('&')[0]
                news.push({
                    imageURL: i,
                    title: element.querySelector('div.inline > a > strong')?.innerText.trim(),
                    desc: element.querySelector('div.inline > p')?.innerText.trim(),
                    type: 'Football-Koora'
                })
            }
            return news;
        });

        console.log('Koora', news)

        await browser.close()

        myNews.insertMany(news).then((docs) => {
            console.log("Multiple documents inserted to Collection");
        }).catch((err) => {
            console.error(err);
        })

        res.status(200).json(news)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }

});

module.exports = router;