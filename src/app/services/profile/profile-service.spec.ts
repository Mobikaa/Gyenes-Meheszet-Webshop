import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from './profile-service';
import { User } from '../../shared/models/user';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    address: {
      phone_number: '+36701234567',
      country: 'Magyarország',
      city: 'Budapest',
      postal_code: '1011',
      street: 'Fő utca',
      house_number: '1',
      floor_door: '2/A'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });

    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user profile', () => {
    const token = 'test-token';
    const userId = 1;

    service.getUserProfile(userId, token).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/users/${userId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(mockUser);
  });

  it('should update user profile', () => {
    const token = 'test-token';
    const userId = 1;

    service.updateUserProfile(userId, mockUser, token).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/users/${userId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockUser);
  });
});
