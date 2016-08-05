Rx.Observable.fromEvent(document.querySelector('#student-ssn'), 'keyup')
  .map(input => input.srcElement.value)
  .filter(ssn => ssn !== null && ssn.length !== 0)
  .map(ssn => ssn.replace(/^\s*|\s*$|\-/g, ''))
  .skipWhile(ssn => ssn.length !== 9)
  .subscribe(validSsn => {
     console.log(`Valid SSN ${validSsn}`);
});