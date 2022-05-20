package com.example.petadoptionproject.web;

import jdk.swing.interop.SwingInterOpUtils;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;

// this is a proxy. basically making a call to our own controller so it can make a cal to the google api
@Controller
public class GoogleMapsController {
    @Value("${googleAPIKey}")
    private String googleAPIKey;

// this is concantenated because the google api key will be its own variable and not part of the URL variable
    //   private String myUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=78801&destinations=78254&key=AIzaSyCQekvuf0nOxzwr7LBbS-voOZmKtHp7jMU"

    @ResponseBody //when you want raw data back you must use this annotation
    @GetMapping("/gogglemap/**")
    public String getMap(HttpServletRequest request) throws IOException {
        String urlToCall = buildRequestURL(request,googleAPIKey);
        return makeHttpRequest(urlToCall);
    }

    private String buildRequestURL(HttpServletRequest request, String apiKey){
        String baseDomain = "https://maps.googleapis.com/";
        String baseurlWithQueryParams = (request.getRequestURI().split("/gogglemap/")[1]) + "?" + request.getQueryString();
        String apiKeyQueryParam = "&key=" + apiKey;
        return baseDomain + baseurlWithQueryParams + apiKeyQueryParam;
    }

    private String makeHttpRequest(String urlToCall){
        try {
            URL url = new URL(urlToCall);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            return content.toString();
        }catch (Exception ex){
            return ex.getMessage();
        }
    }

}
// https://maps.googleapis.com/maps/api/distancematrix/json?origins=78801&destinations=78254&key=AIzaSyCQekvuf0nOxzwr7LBbS-voOZmKtHp7jMU
// https://maps.googleapis.com/googlemap/maps/api/distancematrix/json?maps/api/distancematrix/json?origins=78801&destinations=78254&key=AIzaSyCQekvuf0nOxzwr7LBbS-voOZmKtHp7jMU