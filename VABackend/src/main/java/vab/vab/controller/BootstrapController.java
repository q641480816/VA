package vab.vab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vab.vab.exception.VAException;
import vab.vab.model.CountryYear;
import vab.vab.services.BootstrapService;
import vab.vab.services.ReadfileServices;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bootstrap")
public class BootstrapController {

    @Autowired
    private BootstrapService bootstrapService;

    @Autowired
    private ReadfileServices readfileServices;

    @RequestMapping(value = "/start", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> bootstrap()throws Exception {
        return bootstrapService.bootstrap();
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAllRecords()throws Exception {
        return bootstrapService.getDataSet();
    }

    @RequestMapping(value = "/read", method = RequestMethod.GET)
    @ResponseBody
    public List<List<String>> read()throws Exception {
        return readfileServices.read();
        //Map<String, Object> res = new HashMap<>();
        //res.put("result", "ok");
        //return res;
    }
}
