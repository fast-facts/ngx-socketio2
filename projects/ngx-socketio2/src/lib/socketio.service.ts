import { Inject, Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable, take } from 'rxjs';
import { DefaultEventsMap, EventNames, EventParams, EventsMap } from '@socket.io/component-emitter';
import { Socket as _Socket, io, Manager } from 'socket.io-client';
import { SocketioConfig } from './socketio.interface';
import { SOCKETIO_CONFIG } from './socketio.token';

@Injectable()
export class Socket<ListenEvents extends EventsMap = DefaultEventsMap, EmitEvents extends EventsMap = ListenEvents> implements OnDestroy {
  private socket: _Socket<ListenEvents, EmitEvents>;

  /**
   * @see {@link Socket.id}
   */
  get id(): string | undefined { return this.socket.id; }

  /**
   * @see {@link Socket.connected}
   */
  get connected(): boolean { return this.socket.connected; }

  /**
   * @see {@link Socket.disconnected}
   */
  get disconnected(): boolean { return this.socket.disconnected; }

  /**
   * @see {@link Socket.io}
   */
  get io(): Manager { return this.socket.io; }

  /**
   * @see {@link Socket.auth}
   */
  get auth(): _Socket['auth'] { return this.socket.auth; }
  /**
   * @see {@link Socket.auth}
   */
  set auth(auth: _Socket['auth']) { this.socket.auth = auth; }

  constructor(
    @Inject(SOCKETIO_CONFIG) { url, options }: SocketioConfig
  ) {
    this.socket = io(url, options);
  }

  ngOnDestroy(): void {
    this.socket.offAny();
  }

  /**
   * @see {@link Socket.connect}
   */
  connect(): this {
    this.socket.connect();
    return this;
  }

  /**
   * @see {@link Socket.disconnect}
   */
  disconnect(): this {
    this.socket.disconnect();
    return this;
  }

  /**
   * @see {@link Socket.send}
   */
  send(...args: any[]): this {
    this.socket.send(...args);
    return this;
  }

  /**
   * @see {@link Socket.emit}
   */
  emit<Ev extends EventNames<EmitEvents>>(eventName: Ev, ...args: EventParams<EmitEvents, Ev>): this {
    this.socket.emit(eventName, ...args);
    return this;
  }

  /**
   * @see {@link Socket.on}
   */
  on<T>(eventName: string): Observable<T> {
    return fromEvent<T>(this.socket as any, eventName);
  }

  /**
   * @see {@link Socket.once}
   */
  once<T>(eventName: string): Observable<T> {
    return this.on<T>(eventName).pipe(take(1));
  }

  /**
   * @see {@link Socket.compress}
   */
  compress(compress: boolean): this {
    this.socket.compress(compress);
    return this;
  }
}
