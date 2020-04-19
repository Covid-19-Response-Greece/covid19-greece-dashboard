// This is source code from ismood react app TODO: make equivalent for covid19-greece-api
import axios from 'axios';
import * as r from 'ramda';

const auth = {
  username: 'fadil',
  password: 'iscov456@'
};

const BaseURL = 'https://covidapi.ismood.com' //'https://covidtest.ismood.com'

const fetchTotalInformation = async () => {
  const { data } = await axios.get(
    `${BaseURL}/total-info/?country_name=greece`,
    { auth },
    {headers: { Referer: 'https://covid19live.ismood.com/'}}
  );

  const {
    total_cases: totalCases,
    active_cases: activeCases,
    total_critical: criticalCases,
    total_recovered: recoveredCases,
    total_deceased: deathCases,
    age_average: averageAge,
    average_death_age: averageDeathAge,
    total_males: maleCount,
    total_females: femaleCount,
    total_age_groups: ageGroups,
  } = data[0];

  return {
    totalCases,
    activeCases,
    criticalCases,
    recoveredCases,
    deathCases,
    averageAge,
    averageDeathAge,
    maleCount,
    femaleCount,
    ageGroups,
  }
};

const fetchDailyInformation = async () => {
  const { data } = await axios.get(
    `${BaseURL}/daily-info/?country_name=greece`,
    { auth }
  );

  const results = data.map((entry) => {
    const { date } = entry;

    const {
      to_day_cases: totalCases,
      to_day_deceased: deathCases,
      to_day_recovered: recoveredCases,
      to_day_active_cases: activeCases,
      new_cases: newCases,
    } = entry;

    return {
      date,
      totalCases,
      deathCases,
      activeCases,
      recoveredCases,
      newCases,
    };
  });

  return r.sortBy(r.prop('date'))(results);
}

const fetchRegionsInformation = async () => {
  const { data } = await axios.get(
    `${BaseURL}/regions/?country_name=greece`,
    { auth }
  );

  return data.map((entry) => ({
      casesCount: entry.region_cases,
      enName: entry.region_en_name,
      grName: entry.region_gr_name,
  }));
}

export {
  fetchTotalInformation,
  fetchDailyInformation,
  fetchRegionsInformation,
};
