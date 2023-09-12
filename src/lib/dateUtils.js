export  function formatRelativeDate(date){
    const registrationDate = new Date(date);
const currentDate = new Date();
const timeDifference = currentDate - registrationDate;

if (timeDifference < 24 * 60 * 60 * 1000) { // Moins d'un jour
const hoursDifference = timeDifference / (1000 * 60 * 60);
const roundedHours = Math.floor(hoursDifference);
const minutesDifference = (timeDifference % (1000 * 60 * 60)) / (1000 * 60);
const roundedMinutes = Math.floor(minutesDifference);
const secondsDifference = ((timeDifference % (1000 * 60 * 60)) % (1000 * 60)) / 1000;
const roundedSeconds = Math.floor(secondsDifference);

return `${roundedHours} ${roundedHours === 1 ? 'heure' : 'heures'} ${roundedMinutes} ${roundedMinutes === 1 ? 'minute' : 'minutes'} ${roundedSeconds} ${roundedSeconds === 1 ? 'seconde' : 'secondes'}`;
} else if (timeDifference < 30 * 24 * 60 * 60 * 1000) { // Moins de 30 jours
const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
const roundedDays = Math.floor(daysDifference);
return `${roundedDays} ${roundedDays === 1 ? 'jour' : 'jours'}`;
} else if (timeDifference < 12 * 30 * 24 * 60 * 60 * 1000) { // Moins de 12 mois
const monthsDifference = timeDifference / (1000 * 60 * 60 * 24 * 30.44);
const roundedMonths = Math.floor(monthsDifference);
return `${roundedMonths} ${roundedMonths === 1 ? 'mois' : 'mois'}`;
} else { // 12 mois ou plus
const yearsDifference = timeDifference / (1000 * 60 * 60 * 24 * 365.25);
const roundedYears = Math.floor(yearsDifference);
return `${roundedYears} ${roundedYears === 1 ? 'an' : 'ans'}`;
}
  
  
  }
