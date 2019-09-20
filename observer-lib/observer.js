function Observer(obj, onGetValue, onSetValue) {
    this.enabled = true;

    this.getHandler = function () {
        const $self = this;

        let handler = {
            get(target, prop) {
                const exists = prop in target;
                const value = exists ? target[prop] : null;
                if ($self.enabled) onGetValue(prop, value, exists);
                return value;
            },

            set(target, prop, value) {
                const exists = prop in target;
                if ($self.enabled) onSetValue(prop, target[prop], value, exists);
                target[prop] = value;
            }
        };

        return handler;
    }

    this.proxy = new Proxy(obj, this.getHandler());

    this.get = function (prop) {
        return this.proxy[prop];
    }

    this.set = function (prop, newValue) {
        this.proxy[prop] = newValue; // newValue -> function or value
    }

    this.toggle = function () {
        this.enabled = !this.enabled;
    }

    this.call = function (f, ...args) {
        let value = this.proxy[f](...args);
        if (value) return value;
    }
}

export { Observer };