package vab.vab.model;

import org.springframework.stereotype.Component;

@Component
public class CountryYearSmokeDeath {

    private String countryName;

    private String countryCode;

    private String year;

    private int death;

    public CountryYearSmokeDeath(){super();}

    public CountryYearSmokeDeath(CountryYear cy){
        this.countryName = cy.getCountryName();
        this.countryCode = cy.getCountryCode();
        this.year = cy.getYear();
        this.death = cy.getDeath();
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public int getDeath() {
        return death;
    }

    public void setDeath(int death) {
        this.death = death;
    }
}
