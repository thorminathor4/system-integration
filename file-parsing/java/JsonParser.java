import java.util.Scanner;
import java.util.Map;
import java.util.HashMap;
import java.io.File;
//import org.json.JSONObject;  
//import org.json.JSONArray;
//import org.json.JSONException;

class JsonParser{
    public static void main(String[] args){
        try{
            Scanner scanner = new Scanner(new File(args[0]));
            String inputString = "";
            if(scanner.hasNextLine())
                inputString = scanner.nextLine();
            while(scanner.hasNextLine())
                inputString += "\n" + scanner.nextLine();
            System.out.print(inputString);
            //JSONObject jsonObject = new JSONObject(inputString);
            //System.out.print(jsonObject);
        }catch(Exception exception){
            System.out.print(exception);
        }
    }
    /*
    public static Map<String, Object> jsonToMap(JSONObject json) throws JSONException {
        Map<String, Object> retMap = new HashMap<String, Object>();
        
        if(json != JSONObject.NULL) {
            retMap = toMap(json);
        }
        return retMap;
    }

    public static Map<String, Object> toMap(JSONObject object) throws JSONException {
        Map<String, Object> map = new HashMap<String, Object>();

        Iterator<String> keysItr = object.keys();
        while(keysItr.hasNext()) {
            String key = keysItr.next();
            Object value = object.get(key);
            
            if(value instanceof JSONArray) {
                value = toList((JSONArray) value);
            }
            
            else if(value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            map.put(key, value);
        }
        return map;
    }

    public static List<Object> toList(JSONArray array) throws JSONException {
        List<Object> list = new ArrayList<Object>();
        for(int i = 0; i < array.length(); i++) {
            Object value = array.get(i);
            if(value instanceof JSONArray) {
                value = toList((JSONArray) value);
            }

            else if(value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            list.add(value);
        }
        return list;
    }*/
}