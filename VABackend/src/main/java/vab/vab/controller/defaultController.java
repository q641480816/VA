package vab.vab.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import vab.vab.exception.VAException;

import java.util.HashMap;
import java.util.Map;

@RestController
public class defaultController {
    @RequestMapping("/default")
    @ResponseBody
    public Map<String, String> getDefault()throws Exception{
        Map<String, String> res = new HashMap<>();
        res.put("result", "ok");
        call();
        return res;
    }

    private void call() throws Exception{
        throw new VAException("Fuck you bitch!");
    }
}
