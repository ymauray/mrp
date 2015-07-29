package fr.skym.mrp.config.db.converters

import org.joda.time.LocalDate
import org.springframework.core.convert.converter.Converter

class StringToLocalDateConverter implements Converter<String, LocalDate> {

    @Override
    LocalDate convert(String source) {
        return LocalDate.parse(source)
    }
}
