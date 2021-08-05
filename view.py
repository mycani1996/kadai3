import eel
import desktop
import search
import pandas as pd

app_name="html"
end_point="index.html"
size=(700,600)

@ eel.expose
def charactor_search(word):
    search.charactor_search(word)

@ eel.expose
def change_source_file(data):
    # print(data[0])
    df=pd.DataFrame(data)
    df.columns = ["name"]
    df.to_csv("./source.csv",encoding="utf_8-sig")

desktop.start(app_name,end_point,size)
#desktop.start(size=size,appName=app_name,endPoint=end_point)