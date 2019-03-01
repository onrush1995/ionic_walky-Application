import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import {DeviceMotionAccelerometerOptions} from '@ionic-native/device-motion';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    x: number;
    y: number;
    z: number;
    timeStamp: number;
    id: any;
    status: any;
    constructor(private deviceMotion: DeviceMotion) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.timeStamp = 0;
    }
    start() {
        console.log('working');
        try {
            const option: DeviceMotionAccelerometerOptions = {
                    frequency : 200
                };
            this.id = this.deviceMotion.watchAcceleration(option).subscribe((acc: DeviceMotionAccelerationData) => {
                    this.x = acc.x;
                    this.y = acc.y;
                    this.z = acc.z;
                    this.timeStamp = acc.timestamp;
                    const result = (Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z));
                    console.log(result);

                
               
                const newX = Math.abs(this.x);

                if ( newX > 1.0 && result < 15) {
                    this.status = 'Walking';
                }
                if ( result > 15 ) {
                    this.status = 'Running';}
                
                if ( newX < 1) {
                    this.status = 'Resting';}
                
                
            });
        } catch (err) {
            alert('Error' + err);
        }
    }
    stop() {
        this.id.unsubscribe();
        console.log('working');
    }
}
