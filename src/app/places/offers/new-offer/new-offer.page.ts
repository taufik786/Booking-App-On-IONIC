import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  // newForm: FormGroup;

  constructor(private fb: FormBuilder,
    private placesService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController
    ) {}

  get title() {
    return this.newForm.get('title');
  }
  get description() {
    return this.newForm.get('description');
  }

  public errorMessages = {
    title: [
      { type: 'required', message: 'Title is required' },
      { type: 'maxlength', message: 'Title cant be longer than 30 characters' },
    ],
    description: [
      { type: 'required', message: 'Description is required' },
      {
        type: 'maxlength',
        message: 'Description cannot be longer than 180 characters',
      },
    ],
  };

  newForm = this.fb.group({
    title: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required, Validators.maxLength(30)],
    }),
    description: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required, Validators.maxLength(180)],
    }),
    price: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required, Validators.min(1)],
    }),
    dateFrom: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
    dateTo: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
  });

  ngOnInit() {}

  onCreateOffer() {
    if (!this.newForm.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Creating place...'
    }).then(loadingEl => {
      loadingEl.present();

      this.placesService.addPlace(
        this.newForm.value.title,
        this.newForm.value.description,
        +this.newForm.value.price,
        new Date(this.newForm.value.dateFrom),
        new Date(this.newForm.value.dateTo)
      ).subscribe(() => {
        loadingEl.dismiss();
        this.newForm.reset();
        this.router.navigate(['/places/tabs/offers'])

      })
    })

  }
}
