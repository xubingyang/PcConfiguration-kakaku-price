const dotenv = require('dotenv');
const mongoose = require('mongoose');
const moment = require('moment');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const colors = require("colors");
const axios = require('axios');

const config = require('./config/config.json');

// 加载env参数
dotenv.config({ path: './config/config.env' });

(async function connectDB() {
  const connection = await mongoose.connect(
    process.env.MONGO_URI.replace(
      '<MONGO_PASSWORD>',
      process.env.MONGO_PASSWORD
    ).replace('<MONGO_COLLECT_NAME>', process.env.MONGO_COLLECT_NAME),
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  );
  console.log(`MongoDB 数据库连接正常...`.cyan.bold);
})();;

// 调用 Model
const Config = require('./models/Config');
const Configuration = require('./models/Configuration');

(async function getConfigurationPrice() {
  const options = new chrome.Options();
  let chromeOptions;
  if (process.env.ENABLE_CHROME_WINDOW === 'OFF') {
    chromeOptions = options.headless();
  }
  // options.addArguments(
  //   'headless',
  //   'disable-gpu',
  // );
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
  let priceRaw;
  const regex = /¥/gi;
  const regexTwo = /,/gi;

  try {

    const
      cpu = {},
      motherboard = {},
      memory = {},
      ssd = {},
      hdd = {},
      graphicCard = {},
      cooling = {},
      powerUnit = {},
      pcCase = {},
      caseFan = {},
      keyboard = {},
      mouse = {},
      monitor = {},
      captureCard = {},
      soundCard = {};

    if (config.cpu.quantity > 0 && config.cpu.link !== null) {
      await driver.get(config.cpu.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      cpu.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      cpu.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.motherboard.quantity > 0 && config.motherboard.link !== null) {
      await driver.get(config.motherboard.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      motherboard.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      motherboard.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.memory.quantity > 0 && config.memory.link !== null) {
      await driver.get(config.memory.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      memory.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      memory.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.ssd.quantity > 0 && config.ssd.link !== null) {
      await driver.get(config.ssd.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      ssd.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      ssd.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.hdd.quantity > 0 && config.hdd.link !== null) {
      await driver.get(config.hdd.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      hdd.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      hdd.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.graphicCard.quantity > 0 && config.graphicCard.link !== null) {
      await driver.get(config.graphicCard.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      graphicCard.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      graphicCard.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.cooling.quantity > 0 && config.cooling.link !== null) {
      await driver.get(config.cooling.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      cooling.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      cooling.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.powerUnit.quantity > 0 && config.powerUnit.link !== null) {
      await driver.get(config.powerUnit.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      powerUnit.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      powerUnit.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.pcCase.quantity > 0 && config.pcCase.link !== null) {
      await driver.get(config.pcCase.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      pcCase.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      pcCase.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.caseFan.quantity > 0 && config.caseFan.link !== null) {
      await driver.get(config.caseFan.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      caseFan.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      caseFan.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.keyboard.quantity > 0 && config.keyboard.link !== null) {
      await driver.get(config.keyboard.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      keyboard.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      keyboard.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.mouse.quantity > 0 && config.mouse.link !== null) {
      await driver.get(config.mouse.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      mouse.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      mouse.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.monitor.quantity > 0 && config.monitor.link !== null) {
      await driver.get(config.monitor.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      monitor.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      monitor.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.captureCard.quantity > 0 && config.captureCard.link !== null) {
      await driver.get(config.captureCard.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      captureCard.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      captureCard.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }

    if (config.soundCard.quantity > 0 && config.soundCard.link !== null) {
      await driver.get(config.soundCard.link);
      await driver.sleep(process.env.WAIT_INTERVAL);
      soundCard.name = await (await driver.findElement(By.xpath('//*[@id="titleBox"]/div[1]/h2'))).getText();
      priceRaw = await (await driver.findElement(By.xpath('//*[@id="priceBox"]/div[1]/div/p/span'))).getText();
      soundCard.price = Number(priceRaw.replace(regex, '').replace(regexTwo, ''));
    }


    const payloadConfig = {
      cpu: {
        quantity: config.cpu.quantity,
        link: config.cpu.link
      },
      motherboard: {
        quantity: config.motherboard.quantity,
        link: config.motherboard.link
      },
      memory: {
        quantity: config.memory.quantity,
        link: config.memory.link
      },
      ssd: {
        quantity: config.ssd.quantity,
        link: config.ssd.link
      },
      hdd: {
        quantity: config.hdd.quantity,
        link: config.hdd.link
      },
      graphicCard: {
        quantity: config.graphicCard.quantity,
        link: config.graphicCard.link
      },
      cooling: {
        quantity: config.cooling.quantity,
        link: config.cooling.link
      },
      powerUnit: {
        quantity: config.powerUnit.quantity,
        link: config.powerUnit.link
      },
      pcCase: {
        quantity: config.pcCase.quantity,
        link: config.pcCase.link
      },
      caseFan: {
        quantity: config.caseFan.quantity,
        link: config.caseFan.link
      },
      keyboard: {
        quantity: config.keyboard.quantity,
        link: config.keyboard.link
      },
      mouse: {
        quantity: config.mouse.quantity,
        link: config.mouse.link
      },
      monitor: {
        quantity: config.monitor.quantity,
        link: config.monitor.link
      },
      captureCard: {
        quantity: config.captureCard.quantity,
        link: config.captureCard.link
      },
      soundCard: {
        quantity: config.soundCard.quantity,
        link: config.soundCard.link
      }
    };

    const payloadConfiguration = {
      cpu: {
        quantity: config.cpu.quantity,
        link: config.cpu.link,
        name: cpu.name,
        price: cpu.price
      },
      motherboard: {
        quantity: config.motherboard.quantity,
        link: config.motherboard.link,
        name: motherboard.name,
        price: motherboard.price
      },
      memory: {
        quantity: config.memory.quantity,
        link: config.memory.link,
        name: memory.name,
        price: memory.price
      },
      ssd: {
        quantity: config.ssd.quantity,
        link: config.ssd.link,
        name: ssd.name,
        price: ssd.price
      },
      hdd: {
        quantity: config.hdd.quantity,
        link: config.hdd.link,
        name: hdd.name,
        price: hdd.price
      },
      graphicCard: {
        quantity: config.graphicCard.quantity,
        link: config.graphicCard.link,
        name: graphicCard.name,
        price: graphicCard.price
      },
      cooling: {
        quantity: config.cooling.quantity,
        link: config.cooling.link,
        name: cooling.name,
        price: cooling.price
      },
      powerUnit: {
        quantity: config.powerUnit.quantity,
        link: config.powerUnit.link,
        name: powerUnit.name,
        price: powerUnit.price
      },
      pcCase: {
        quantity: config.pcCase.quantity,
        link: config.pcCase.link,
        name: pcCase.name,
        price: pcCase.price
      },
      caseFan: {
        quantity: config.caseFan.quantity,
        link: config.caseFan.link,
        name: caseFan.name,
        price: caseFan.price
      },
      keyboard: {
        quantity: config.keyboard.quantity,
        link: config.keyboard.link,
        name: keyboard.name,
        price: keyboard.price
      },
      mouse: {
        quantity: config.mouse.quantity,
        link: config.mouse.link,
        name: mouse.name,
        price: mouse.price
      },
      monitor: {
        quantity: config.monitor.quantity,
        link: config.monitor.link,
        name: monitor.name,
        price: monitor.price
      },
      captureCard: {
        quantity: config.captureCard.quantity,
        link: config.captureCard.link,
        name: captureCard.name,
        price: captureCard.price
      },
      soundCard: {
        quantity: config.soundCard.quantity,
        link: config.soundCard.link,
        name: soundCard.name,
        price: soundCard.price
      }
    }

    const payloadConfigurationArray = [];
    for (let i in payloadConfiguration)
      payloadConfigurationArray.push([i, payloadConfiguration[i]]);
    let sum = 0;
    let temp;
    for (let i in payloadConfigurationArray) {
      temp = payloadConfigurationArray[i].slice(1);
      // console.log(temp[0]);
      if (temp[0].quantity > 0 && temp[0].price > 0) {
        sum += (temp[0].quantity * temp[0].price);
        console.log(`加上单价为 ${temp[0].price} 的 ${temp[0].quantity} 个 ${temp[0].name} 后，总计：${sum} 日元。`);
      }
    };
    console.log(`留给显卡的预算还剩：${300000 - sum} 日元`);
    
    await Config.create(
      {
        date: Number(moment().format('YYYYMMDD')),
        partDetails: payloadConfig
      }
      );
    await Configuration.create(
      {
        date: Number(moment().format('YYYYMMDD')),
        partDetails: payloadConfiguration,
        total: sum
      }
    );

    console.log('上传数据库成功...'.magenta.bold);

    process.exit();
  }
  catch (err) {
    console.error(err);
  }
  finally {
    await driver.quit();
  }
})();