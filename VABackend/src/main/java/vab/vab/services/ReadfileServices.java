package vab.vab.services;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ReadfileServices {

    public List<List<String>> read() throws Exception{
        List<String> fileNames = getFiles();
        List<List<String>> allRecords = new ArrayList<>();

        //get metaData

        Map<String, List<String>> meta = getMetaData();

        //prepare all records from raw data
        for (String name : fileNames){
            ArrayList<List<String>> fileContent = getOneFile(name);
            allRecords.addAll(fileContent);
        }

        System.out.println("get files done");
        ArrayList<List<String>> allRecordFinal = new ArrayList<>();
        for (List<String> allRecord : allRecords) {
            ArrayList<String> r = new ArrayList<>();
            r.addAll(allRecord);
            r.addAll(meta.get(r.get(4)));
            allRecordFinal.add(r);
        }
        System.out.println(allRecordFinal.size());

        //write file
        File f = new File("U:/temp.csv");
        if (f.exists()) f.delete();
        FileWriter fw = new FileWriter(new File("U:/pollution_master_data.csv"));
        fw.write(System.lineSeparator());
        for(List<String> r: allRecordFinal){
            StringBuilder s = new StringBuilder();
            for (int i = 0; i < r.size(); i++) {
                if (i == 22) continue;
                String aR = r.get(i);
                s.append(aR).append(",");
            }
            String record = s.toString().substring(0, s.length() - 1);
            fw.write(record);
            fw.write(System.lineSeparator()); //new line
        }
        fw.close();

        System.out.println("done writing");

        return allRecordFinal;
    }

    private List<String> getFiles() throws Exception {
        return  readLines("files.csv")
                .parallel()
                .map(String::trim)
                .collect(Collectors.toList());
    }

    private ArrayList<List<String>> getOneFile(String name) throws Exception {
        return (ArrayList<List<String>>) readLines(name)
                .parallel()
                .skip(1)
                .map(r -> r.split(","))
                .map(Arrays::asList)
                .collect(Collectors.toList());
    }

    private Map<String ,List<String>> getMetaData() throws Exception {
        return readLines("metadata.csv")
                .parallel()
                .skip(1)
                .map(r -> r.split(","))
                .map(Arrays::asList)
                .collect(Collectors.toMap(d -> d.get(5), d -> d));
    }

    private Stream<String> readLines(String name) throws Exception{
        File file = ResourceUtils.getFile("classpath:static/" + name);
        //File file = new File(ClassLoader.getSystemClassLoader().getResource("static/" + name + ".csv").getFile());
        return Files.lines(file.toPath(),Charset.forName("UTF-8"));
    }
}
