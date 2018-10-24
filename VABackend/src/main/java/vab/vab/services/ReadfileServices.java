package vab.vab.services;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileWriter;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ReadfileServices {

    public void read() throws Exception{
        ArrayList<String[]> data = (ArrayList<String[]>) readLines()
                .skip(1)
                .parallel()
                .map(a -> a.split(","))
                .collect(Collectors.toList());

        HashMap<String, String[]> result = new HashMap<>();

        for (String[] record : data){
            if (result.containsKey(record[0]+record[1])){
                String[] temp = result.get(record[0]+record[1]);
                switch (record[2]){
                    case "Young":
                        int young = Integer.parseInt(record[3]);
                        temp[2] = Integer.parseInt(temp[2]) + young + "";
                        temp[5] = Integer.parseInt(temp[5]) + young + "";
                        break;
                    case "Economy Active":
                        int ea = Integer.parseInt(record[4]);
                        temp[3] = Integer.parseInt(temp[3]) + ea + "";
                        temp[5] = Integer.parseInt(temp[5]) + ea + "";
                        break;
                    case "Aged":
                        int ag = Integer.parseInt(record[5]);
                        temp[4] = Integer.parseInt(temp[4]) + ag + "";
                        temp[5] = Integer.parseInt(temp[5]) + ag + "";
                }
                result.put(record[0]+record[1], temp);
            }else {
                String[] temp = new String[6];
                for (int i = 0; i < 6; i++){
                    temp[i] = "0";
                }
                temp[0] = record[0]; temp[1] = record[1];
                switch (record[2]){
                    case "Young":
                        temp[2] = record[3];
                        temp[5] = record[3];
                        break;
                    case "Economy Active":
                        temp[3] = record[4];
                        temp[5] = record[4];
                        break;
                    case "Aged":
                        temp[4] = record[5];
                        temp[5] = record[5];
                }
                result.put(record[0]+record[1], temp);
            }
        }

        //write file
        FileWriter fw = new FileWriter(new File("U:/temp.csv"));
        Set<String> keys = result.keySet();
        for(String key: keys){
            String[] d = result.get(key);
            StringBuilder s = new StringBuilder();
            for (int i = 0; i < 6; i++){
                s.append(d[i]).append(",");
            }
            String r = s.toString().substring(0, s.length() - 1);
            fw.write(r);
            fw.write(System.lineSeparator()); //new line
        }
        fw.close();
    }



    private Stream<String> readLines() throws Exception{
        File file = ResourceUtils.getFile("classpath:static/test.csv");
        //File file = new File(ClassLoader.getSystemClassLoader().getResource("static/" + name + ".csv").getFile());
        return Files.lines(file.toPath());
    }
}
