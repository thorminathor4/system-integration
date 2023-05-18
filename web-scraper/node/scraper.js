import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";

const books = [];

try{
    let url = "http://books.toscrape.com/";
    while(url){
        console.log(url);
        const response = await axios.get(url);
        const query = cheerio.load(response.data);
        const bookArticles = query("article");
        bookArticles.each(function(){
            const title = query(this).find("h3 a").attr("title");
            const price = query(this).find(".price_color").text();
            const status = query(this).find(".availability").text().trim();
            books.push({title, price, status});
        });
        const next = query(".next a");
        if(next.length > 0){
            const link = next.attr("href");
            url = [...url.split("/").slice(0, -1), link].join("/");
        }else
            break;
    }
}catch(error){
    console.error(error);
}

fs.writeFileSync("books.json", JSON.stringify(books, null, 2));